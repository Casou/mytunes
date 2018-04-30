import React from "react";

class ListeGenres extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <h1>
                Liste par genres
            </h1>
        );
    }
}

// const ListeGenres = () => (
//   <h1>
//     Liste par genres
//   </h1>
// );

export default ListeGenres;