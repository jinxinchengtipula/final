class Servicios {
    obtenerUsuarios(token, callback) {
        const apiurl = 'json/usuario.json';
        $.ajax({
            url: apiurl,
            method: 'GET',
            data: { token },
            success: (response) => {
                callback(null, response);
            },
            error: (error) => {
                callback(error);
            }
        });
    }
}

export default Servicios;
