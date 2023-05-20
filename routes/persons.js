import express from "express";

import persons from "server.js";
const getNumbers = async (req, res) => {
  try {
    const numbers = await Number.find();
    res.status(200).json(numbers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default getNumbers;
