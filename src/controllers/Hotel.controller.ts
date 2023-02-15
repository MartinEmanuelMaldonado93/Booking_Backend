import { NextFunction, RequestHandler, Response } from "express";
import Hotel from "../models/Hotel.model";

export const createHotel: RequestHandler = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateHotel: RequestHandler = async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHotel: RequestHandler = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotels: RequestHandler = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: {
        $gt: min || 1, // greater than...
        $lt: max || 999, // less than...
      },
    }).limit(Number(limit)); // search featured property
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity: RequestHandler = async (req, res, next) => {
  const citiesColection = req.query.cities! as string;
  const cities = citiesColection.split(",");
  try {
    const hotels = await Promise.all(
      cities.map(
        (city) => Hotel.countDocuments({ city: city }) // method by mongo, much faster an performant
      )
    );

    // setTimeout(() => res.status(200).json(hotels), 1500);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByType: RequestHandler = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelById: RequestHandler = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
