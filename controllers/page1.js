/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
//import { Page1 } from "../models/Page1.js";



// Array of the stages of love with descriptions
const stagesOfLove = [
  {
    name: "Attraction",
    description: "Initial interest and physical or emotional pull toward someone."
  },
  {
    name: "Romance",
    description: "Excitement, infatuation, and idealization of the partner."
  },
  {
    name: "Passion",
    description: "Intense emotions and desire, often physical."
  },
  {
    name: "Intimacy",
    description: "Deep emotional connection, trust, and sharing."
  },
  {
    name: "Commitment",
    description: "Decision to maintain love and stay together long-term."
  },
  {
    name: "Companionate Love",
    description: "Stable, affectionate love based on deep attachment and friendship."
  }
];

// Function to return stages as a formatted string
function getStages(arr) {
  return arr.join(", ");
}

export const index = async (req, res) => {
  res.render("page1", {
    number: 1,
    stages: stagesOfLove
  });
};