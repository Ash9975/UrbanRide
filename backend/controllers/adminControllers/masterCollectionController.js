import mongoose, { disconnect } from "mongoose";
import MasterData from '../../models/masterDataModel.js'
import { v4 as uuidv4 } from 'uuid';
import { errorHandler } from "../../utils/error.js";

const dummyData = [

  //kochi
  { district: 'Kochi', location: 'kalamassery : skoda service', type: 'location' },
  { district: 'Kochi', location: 'kalamassery : volkswagen', type: 'location' },
  { district: 'Kochi', location: 'cheranallur : volkswagen', type: 'location' },

  //kottayam

  { district: 'Kottayam', location: 'ettumanoor : skoda service', type: 'location' },
  { district: 'Kottayam', location: 'kottayam : railway station', type: 'location' },
  { district: 'Kottayam', location: 'thellakom : volkswagen', type: 'location' },

  //trivandrum

  { district: 'Trivandrum', location: 'Nh 66 bybass : kochuveli railway station', type: 'location' },
  { district: 'Trivandrum', location: 'tampanur : central railway station', type: 'location' },
  { district: 'Trivandrum', location: 'kazhakootam : railway station', type: 'location' },

  //thrissur
  { district: 'Thrissur', location: 'thrissur : railway station', type: 'location' },
  { district: 'Thrissur', location: 'valarkavu : near ganam theater', type: 'location' },
  { district: 'Thrissur', location: 'paliyekara : evm mg', type: 'location' },


  //calicut
  { district: 'Calicut', location: 'calicut : railway', type: 'location' },
  { district: 'Calicut', location: 'calicut : airport', type: 'location' },
  { district: 'Calicut', location: 'pavangad : evm nissan', type: 'location' },

  //alto
  { model: 'Alto 800', variant: 'manual', type: 'car', brand: 'maruthi' },
  { model: 'Alto 800', variant: 'automatic', type: 'car', brand: 'maruthi' },
  { model: 'SKODA SLAVIA PETROL AT', variant: 'automatic', type: 'car', brand: 'maruthi' },
  { model: 'NISSAN MAGNITE PETROL MT', variant: 'manual', type: 'car', brand: 'nissan' },
  { model: 'SKODA KUSHAQ Petrol MT', variant: 'manual', type: 'car', brand: 'skoda' },
  { model: 'SKODA KUSHAQ Petrol AT', variant: 'automatic', type: 'car', brand: 'skoda' },
  { model: 'MG HECTOR Petrol MT', variant: 'manual', type: 'car', brand: 'mg' },
  { model: 'MG HECTOR Petrol AT', variant: 'automatic', type: 'car', brand: 'mg' },
  { model: 'MG HECTOR Diesel MT', variant: 'manual', type: 'car', brand: 'mg' },
  { model: 'NISSAN TERRANO Diesel MT', variant: 'manual', type: 'car', brand: 'nissan' },
  { model: 'NISSAN KICKS Petrol MT', variant: 'manual', type: 'car', brand: 'nissan' },
  { model: 'NISSAN KICKS Petrol AT', variant: 'manual', type: 'car', brand: 'nissan' },
  { model: 'VW TAIGUN Petrol MT', variant: 'manual', type: 'car', brand: 'volkswagen' },
  { model: 'NISSAN MAGNITE Petrol MT', variant: 'manual', type: 'car', brand: 'nissan' },
  { model: 'HYUNDAI ALCAZAR Diesel AT', variant: 'automatic', type: 'car', brand: 'hyundai' },
  { model: 'CITROEN C3 Petrol MT', variant: 'automatic', type: 'car', brand: 'citroen' },
  { model: 'ISUZU MUX Diesel AT', variant: 'automatic', type: 'car', brand: 'isuzu' },
  { model: 'MG HECTOR PLUS Petrol MT', variant: 'manual', type: 'car', brand: 'mg' },
  { model: 'MG HECTOR PLUS Petrol AT', variant: 'automatic', type: 'car', brand: 'mg' },
  { model: 'MG HECTOR PLUS Diesel MT', variant: 'manual', type: 'car', brand: 'mg' },


  { model: 'MARUTI SWIFT Petrol AT', variant: 'automatic', type: 'car', brand: 'maruthi' },
  { model: 'DATSUN REDI GO Petrol MT', variant: 'manual', type: 'car', brand: 'DATSUN' },
  { model: 'DATSUN REDI GO Petrol AT', variant: 'automatic', type: 'car', brand: 'DATSUN' },
  { model: 'NISSAN MICRA Petrol MT', variant: 'automatic', type: 'car', brand: 'NISSAN' },
  { model: 'VW AMEO Diesel MT', variant: 'manual', type: 'car', brand: 'volkswagen' },
  { model: 'SKODA RAPID Petrol MT', variant: 'manual', type: 'car', brand: 'skoda' },
  { model: 'MARUTI DZIRE Petrol MT', variant: 'manual', type: 'car', brand: 'maruthi' },
  { model: 'VW VENTO Petrol MT', variant: 'manual', type: 'car', brand: 'volkswagen' },
  { model: 'VW VENTO Petrol AT', variant: 'automatic', type: 'car', brand: 'volkswagen' },
  { model: 'VW VENTO Diesel AT', variant: 'automatic', type: 'car', brand: 'volkswagen' },
  { model: 'VW POLO Petrol MT', variant: 'manual', type: 'car', brand: 'volkswagen' },
  { model: 'VW POLO Petrol AT', variant: 'automatic', type: 'car', brand: 'volkswagen' },
  { model: 'VW POLO Diesel MT', variant: 'manual', type: 'car', brand: 'volkswagen' },




];

// Function to insert dummy data into the database
export const insertDummyData = async (req, res, next) => {
  try {
    // await MasterData.deleteMany();
    for (const item of dummyData) {
      const exists = await MasterData.findOne({
        type: item.type,
        ...(item.type === "location"
          ? { district: item.district, location: item.location }
          : { model: item.model, variant: item.variant }),
      });

      if (!exists) {
        await MasterData.create(item);
      }
    }

    res.status(200).json({
      success: true,
      message: "Dummy data inserted (no duplicates)"
    });

  } catch (error) {
    console.error("Error inserting dummy data:", error);
    next(errorHandler(500, "Seed failed"));
  }
};

//app product modal data fetching from db
export const getCarModelData = async (req, res, next) => {
  try {
    const data = await MasterData.find();

    if (!data.length) {
      return next(errorHandler(404, "No model found"));
    }

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    next(errorHandler(500, "Could not get model data"));
  }
};


