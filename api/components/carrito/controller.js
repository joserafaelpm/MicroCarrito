// const {nanoid} = require('nanoid');
// const auth = require('../auth');

const carrito = require('.');

const TABLA = 'carrito';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        console.log('listado get')
        return store.list(TABLA);
        
    }

    function get(id) {
        console.log('get por ids')
        return store.get(TABLA, id);

    }

    function getRemove(id) {
        console.log('delete por ids')
        return store.remove(TABLA, id);

    }
    
    async function upsert(body) {
        console.log('entra-upsert-controller')
        const carrito = {
            nombre: body.nombre,
            precio: body.precio,
            cantidad: body.cantidad,
        }
         console.log(body.nombre+ ' body')
        return store.upsert(TABLA, carrito);
    }

  async function upDate(body) {
        const carrito = {
            id: body.id,
            nombre: body.nombre,
            precio: body.precio,
            cantidad: body.cantidad,
        }
        console.log('id-'+carrito.id)
        return store.update(TABLA, carrito, carrito.id);
    }

    function follow(from, to) {
        console.log('2')
        return store.upsert(TABLA + '_follow', {
            carrito_from: from,
            carrito_to: to,
        });
    }

    async function following(carrito) {
        console.log('1')
        const join = {}
        join[TABLA] = 'carrito_to'; // { carrito: 'carrito_to' }
        const query = { carrito_from: carrito };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        getRemove,
        upDate,
        upsert,
        follow,
        following,
    };
}