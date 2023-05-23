import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Mobile",
    description:
      "Experience the world at your fingertips! Work, socialise, book a ride, play games, listen to music, watch your favourite shows, take a photo, or simply make a call! Buy a Mobile Phone from GadgetLo that does it all and then some.",
  },
  {
    _id: uuid(),
    categoryName: "Laptop",
    description:
      "While tablets and smartphones are still popular, most people agree that everything, from doing research for an assignment to playing hardcore games, works better on a laptop. It doesn't matter what your lifestyle is, there is always one for you at GadgetLo.",
  },
  {
    _id: uuid(),
    categoryName: "Television",
    description:
      "Streaming services have made it possible to watch your favourite shows and live events on any screen you desire. But every so often you need a screen large enough so you can sink into your sofa or curl up in bed and watch your beloved stories come to life. It doesn't matter what your lifestyle is, there is always a TV for you at GadgetLo.",
  },
  {
    _id: uuid(),
    categoryName: "Accessories",
    description:
      "All add on items which you'd need along with your Laptops, mobiles, Tv's. Eg. Earphones, keyboard, mouse, charger, adapters, ect",
  },
];
