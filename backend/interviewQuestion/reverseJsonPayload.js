// Q - create a express.js router that will accept the json payload and return in response the same json payload in the reverse order

import express, { Router } from "express";

const router = Router();

const reverseJson = async (req, res) => {
  try {
    const { payload } = req.body; //assuming the payload is receiving from the req.body

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Payload is missing",      
      });
    }
    if (Array.isArray(payload)) {
      return res.status(200).json(payload.reverse());
    } else if (typeof payload == "object" && payload !== "null") {
      Object.entries(payload) //entries will convert into an array based on key,value paair
        .reverse() //reverser the new array
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return res.status(200).json(acc);
        }, {}); //convert into an object
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

router.route("/acceptJson").post(reverseJson);
