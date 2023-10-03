import IDesign from './IDesign';

export default interface IProduct {
  id?: number,
  category: string,
  model: string,
  designs: IDesign[]
}

/* Design Variation Table

const product1: IProduct = {
  id: 1,
  category: 'Baby doll',
  model: 'Suede',
  designs: [
    {
      name: 'Nutella',
      picPath: '../Uploads/products/nutella',
      info: [
        {
          size: 'P',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'M',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'G',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'GG',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'EGG',
          quantity: 5,
          allertLow: 0,
          price: 35,
          cost: 25,
        },
      ],
    },
    {
      name: 'Minie',
      picPath: '../Uploads/products/Minie',
      info: [
        {
          size: 'P',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'M',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'G',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'GG',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
      ],
    },
  ],
};

const example = {
  id: 'SUUHSHUDSUIHDUIHUWE',
  CATEGORY: 'Baby doll',
  model: 'PV',
  design: { 'nome da estampa': { sizes: ['P', 'M', 'G', 'GG', 'EGG'] } },
}; */