package com.bparent.mytunes.util;

import java.net.Inet6Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.LinkedList;
import java.util.List;

public class NetworkUtils {

    private static final String FILL_CHAR = "§";
    private static final String EMPTY_CHAR = " ";

    public static String getFormattedIpString(String port) {
        final String ip = NetworkUtils.getIpString(port);
        return ip == null ? null : formatAsciiArt(ip);
    }

    public static String getIpString(String port) {
        String ip;
        try {
            ip = NetworkUtils.getIpString();
        } catch (SocketException e) {
            e.printStackTrace();
            return null;
        }

        if (ip.length() <= 16) {
            String fullIp = ip;
            fullIp += (port == null) ? "" : ":" + port;
            return fullIp;
        }

        return ip;
    }

    private static String formatAsciiArt(String ip) {
        int stringLength = ip.length();
        List<String> listValues = new LinkedList<>();
        for (int i = 0; i < stringLength; i++) {
            listValues.add(ip.substring(i, i+1));
        }

        final StringBuilder builder = new StringBuilder("\n\n");
        int nbLines = AsciiConstants.asciiNumberMap.entrySet().iterator().next().getValue().length;
        for (int line = 0; line < nbLines; line++) {
            final int finalLine = line;
            listValues.forEach(caractere -> {
                Boolean[] listSigns = AsciiConstants.asciiNumberMap.get(caractere)[finalLine];
                Arrays.stream(listSigns).forEach(bool -> builder.append(bool ? FILL_CHAR : EMPTY_CHAR));
            });
            builder.append("\n");
        }
        return builder.toString();
    }

    private static String getIpString() throws SocketException {
        StringBuilder ip = new StringBuilder();
        Enumeration<NetworkInterface> e = NetworkInterface.getNetworkInterfaces();
        while (e.hasMoreElements()){
            Enumeration<InetAddress> i = e.nextElement().getInetAddresses();
            while (i.hasMoreElements()){
                InetAddress a = i.nextElement();

                if (!a.isLoopbackAddress() && a.isSiteLocalAddress()) {
                    return a.getHostAddress();
                }

                ip.append(a.getHostName())
                        .append(" -> ")
                        .append(a.getHostAddress())
                        .append("\n\t isloopback? ")
                        .append(a.isLoopbackAddress())
                        .append("\n\t isSiteLocalAddress? "+a.isSiteLocalAddress())
                        .append("\n\t isIPV6? ")
                        .append((a instanceof Inet6Address))
                        .append("\n\n");
            }
        }
        return ip.toString();
    }

}
