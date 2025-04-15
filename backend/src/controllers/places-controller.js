import HttpError from '../models/http_error.js';
import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];


const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    if (!place) {
        return next(
            new HttpError('Could not find a place for the provied id.', 404)
        );
    }
    res.json({ place }); // => { place } => { place: place }
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })
    if (!places || places.length === 0) {
        return next(
            new HttpError('Could not find a places for the provied user id.', 404)
        );
    }
    res.json({ places });
}

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const { title, description, coordinates, address, creator } = req.body;
    const createPlace = {
        id: uuid(),
        title,
        description,
        locations: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createPlace);
    res.status(201).json({ place: createPlace });
}

const updatePlace = (req, res, next) => {
    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatePlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;
    res.status(200).json({ place: updatePlace });
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find a place for that id.', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'Deleted place.' });
}

const placeController = {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}
export default placeController;