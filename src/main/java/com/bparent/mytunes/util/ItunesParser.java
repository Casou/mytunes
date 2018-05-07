package com.bparent.mytunes.util;

import com.bparent.mytunes.repository.MusiqueRepository;
import com.bparent.mytunes.repository.PlaylistRepository;
import com.bparent.mytunes.exception.IllegalTrackPropertyException;
import com.bparent.mytunes.exception.WrongTrackPropertyTypeException;
import com.bparent.mytunes.model.Musique;
import com.bparent.mytunes.model.Playlist;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Log4j
public class ItunesParser {

    private static final String ELEMENT_KEY = "key";
    private static final String ELEMENT_KEY_TRACKS = "Tracks";
    private static final String ELEMENT_KEY_PLAYLISTS = "Playlists";
    private static final String ELEMENT_DICT = "dict";
    private static final String ELEMENT_ARRAY = "array";

    private static final String TYPE_STRING = "string";
    private static final String TYPE_INTEGER = "integer";
    private static final String TYPE_DATE = "date";
    private static final String TYPE_BOOLEAN_TRUE = "true";
    private static final String TYPE_BOOLEAN_FALSE = "false";

    @Autowired
    private MusiqueRepository musiqueRepository;

    @Autowired
    private PlaylistRepository playlistRepository;


    public void load(String filePath) throws ParserConfigurationException, IOException, SAXException {
//        try {
////            Resource resource = new ClassPathResource("itunes_library.xml");
//            Resource resource = new ClassPathResource(filePath);
//            BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()),1024);
//            StringBuilder stringBuilder = new StringBuilder();
//            String line;
//            while ((line = br.readLine()) != null) {
//                stringBuilder.append(line).append('\n');
//            }
//            br.close();
//            this.xml = stringBuilder.toString();
//        } catch (Exception e) {
//            log.error(e);
//        }

//        File file = new File(filePath);

//        SAXParserFactory factory = SAXParserFactory.newInstance();
//        factory.setNamespaceAware(false);
//        factory.setValidating(false);
//        SAXParser parser = factory.newSAXParser();
//        parser.parse(filePath, new ItunesXMLHandler());

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setValidating(false);
        DocumentBuilder documentBuilder = factory.newDocumentBuilder();
        documentBuilder.setEntityResolver((publicId, systemId) -> new InputSource(new StringReader("")));
        this.parseDocument(documentBuilder.parse(filePath));
    }

    private void parseDocument(Document document) {
        NodeList childNodes = document.getChildNodes();
        for (int i = 0; i < childNodes.getLength(); i++) {
            Node plist = childNodes.item(i);

            if (plist.getChildNodes().getLength() == 0) {
                continue;
            }

            NodeList plistChildren = plist.getChildNodes();
            Node dictNode = getDictNode(plistChildren);

            browseKeys(dictNode);
        }
    }


    private Node getDictNode(NodeList plistChildren) {
        Node dictNode = null;
        for (int j = 0; j < plistChildren.getLength(); j++) {
            Node child = plistChildren.item(j);
            if (Node.ELEMENT_NODE == child.getNodeType()) {
                dictNode = child;
            }
        }
        return dictNode;
    }

    private void browseKeys(Node dictNode) {
        NodeList dictChildren = dictNode.getChildNodes();
        String currentKey = null;
        List<Musique> musiques = null;
        List<Playlist> playlists = null;
        for (int j = 0; j < dictChildren.getLength(); j++) {
            Node child = dictChildren.item(j);
            if (Node.ELEMENT_NODE == child.getNodeType()) {

                if (ELEMENT_KEY.equals(child.getNodeName())) {
                    currentKey = getKey(child);
                } else if (ELEMENT_DICT.equals(child.getNodeName()) && currentKey != null) {
                    if (currentKey.equals(ELEMENT_KEY_TRACKS)) {
                        musiques = buildTracks(child);
                    }
                } else if (ELEMENT_ARRAY.equals(child.getNodeName()) && currentKey != null) {
                    if (currentKey.equals(ELEMENT_KEY_PLAYLISTS)) {
                        playlists = buildPlaylists(child);
                    }
                }
            }
        }

        completeReferences(playlists, musiques);

        musiqueRepository.save(musiques);
        playlistRepository.save(playlists);
    }


    private String getKey(Node child) {
        if (child.getChildNodes().getLength() == 0) {
            return null;
        }
        String keyLabel = child.getChildNodes().item(0).getNodeValue();
        switch (keyLabel) {
            case ELEMENT_KEY_TRACKS :
                return ELEMENT_KEY_TRACKS;
            case ELEMENT_KEY_PLAYLISTS :
                return ELEMENT_KEY_PLAYLISTS;
            default :
                return null;
        }
    }

    private boolean isPropertyType(String nodeName) {
        return TYPE_INTEGER.equals(nodeName) ||
                TYPE_STRING.equals(nodeName) ||
                TYPE_DATE.equals(nodeName) ||
                TYPE_BOOLEAN_TRUE.equals(nodeName) ||
                TYPE_BOOLEAN_FALSE.equals(nodeName);

    }

    private List<Musique> buildTracks(Node dict) {
        NodeList dictChildren = dict.getChildNodes();
        List<Musique> musiques = new ArrayList<>();
        for (int j = 0; j < dictChildren.getLength(); j++) {
            Node child = dictChildren.item(j);
            if (ELEMENT_DICT.equals(child.getNodeName())) {
                musiques.add(extractTrack(child));
            }
        }

        return musiques;
    }

    private Musique extractTrack(Node dictTrack) {
        int j = 0;
        NodeList trackProperties = dictTrack.getChildNodes();
        Musique musique = new Musique();
        while(j < trackProperties.getLength()) {
            Node propertyKey = trackProperties.item(j);
            j++;
            if (!ELEMENT_KEY.equals(propertyKey.getNodeName())) {
                continue;
            }

            Node propertyValue = trackProperties.item(j);
            String nodeValueName = propertyValue.getNodeName();
            j++;
            if (!isPropertyType(nodeValueName)) {
                throw new IllegalTrackPropertyException("Un type de propriété non répertorié a été détecté : " + nodeValueName);
            }

            try {
                musique.fillProperty(propertyKey.getTextContent(), extractContentObject(nodeValueName, propertyValue.getTextContent()));
            } catch (WrongTrackPropertyTypeException e) {
                log.error("Erreur lors du renseignement d'une propriété de la musique", e);
            }
        }
        return musique;
    }

    private Object extractContentObject(String objectType, String objectValue) {
        if (TYPE_INTEGER.equals(objectType)) {
            return new BigInteger(objectValue);
        }
        if (TYPE_BOOLEAN_FALSE.equals(objectType)) {
            return Boolean.FALSE;
        }
        if (TYPE_BOOLEAN_TRUE.equals(objectType)) {
            return Boolean.TRUE;
        }
        return objectValue;
    }


    private List<Playlist> buildPlaylists(Node array) {
        NodeList arrayNodes = array.getChildNodes();
        List<Playlist> playlists = new ArrayList<>();
        for (int i = 0; i < arrayNodes.getLength(); i++) {
            Node dictNode = arrayNodes.item(i);
            if (ELEMENT_DICT.equals(dictNode.getNodeName())) {
                playlists.add(extractPlaylist(dictNode));
            }
        }
//        playlists.stream().forEach(System.out::println);

        return playlists;
    }

    private Playlist extractPlaylist(Node dictNode) {
        NodeList playlistProperties = dictNode.getChildNodes();
        Playlist playlist = new Playlist();
        Node childKey = null;
        for (int j = 0; j < playlistProperties.getLength(); j++) {
            Node child = playlistProperties.item(j);

            if (ELEMENT_KEY.equals(child.getNodeName())) {
                childKey = child;
            } else if (isPropertyType(child.getNodeName()) && childKey != null) {
                try {
                    playlist.fillProperty(childKey.getTextContent(), extractContentObject(child.getNodeName(), child.getTextContent()));
                } catch (WrongTrackPropertyTypeException e) {
                    log.error("Erreur lors du renseignement d'une propriété de la playlist", e);
                }
                childKey = null;
            } else if (ELEMENT_ARRAY.equals(child.getNodeName()) && childKey != null && childKey.getTextContent().equals("Playlist Items")) {
                playlist.setTempMusiqueId(extractMusiqueIdsForPlaylist(child));
            }

        }
        return playlist;
    }


    private List<BigInteger> extractMusiqueIdsForPlaylist(Node arrayNode) {
        List<BigInteger> musiqueIds = new ArrayList<>();
        NodeList arrayChildren = arrayNode.getChildNodes();
        for (int i = 0; i < arrayChildren.getLength(); i++) {
            Node childNode = arrayChildren.item(i);
            if (ELEMENT_DICT.equals(childNode.getNodeName())) {
                musiqueIds.add(extractMusiqueId(childNode));
            }
        }
        return musiqueIds;
    }

    private BigInteger extractMusiqueId(Node playlistMusiqueNode) {
        NodeList arrayChildren = playlistMusiqueNode.getChildNodes();
        for (int i = 0; i < arrayChildren.getLength(); i++) {
            Node childNode = arrayChildren.item(i);
            if (TYPE_INTEGER.equals(childNode.getNodeName())) {
                return new BigInteger(childNode.getTextContent());
            }
        }
        return null;
    }

    private void completeReferences(List<Playlist> playlists, List<Musique> musiques) {
        playlists.forEach(playlist -> {
            String parentId = playlist.getParentPersistentId();
            if (parentId != null) {
                Playlist parent = playlists.stream()
                        .filter(p -> parentId.equals(p.getPersistentId()))
                        .findFirst()
                        .orElse(null);
                if (parent != null) {
                    playlist.setParent(parent);
                    parent.getChildren().add(playlist);
                }
            }

            if (playlist.getTempMusiqueId() == null) {
                return;
            }
            playlist.setMusiques(
                    playlist.getTempMusiqueId().stream()
                            .map(musiqueId -> musiques.stream()
                                    .filter(musique -> musique.getItunesId().equals(musiqueId))
                                    .findFirst()
                                    .orElse(null))
                            .filter(musique -> musique != null)
                            .collect(Collectors.toList()));
            playlist.setTempMusiqueId(null);
        });
    }

}
