/* import IDesignInfo from './IDesignInfo';

export default interface IProduct {
  id?: string,
  category: string,
  model: string,
  designs: {
    [productName: string]: { picPath: string, info: IDesignInfo[] }
  }
}

// Essa mudança visa melhorar o desempenho no banco de dados na hora de buscar por estampas específicas,
// pois no formato anterior, mesmo com o nome do categoria, modelo e estampa, a velocidade de busca na chave
// designs era de O(n) pois a estampa desejada poderia ser a ultima do array, então não estaria adiantando muito já que
// estaria tendo que percorrer o array de qualquer jeito. Nesse formato de agora, por ser um objeto, a complexidade já é 
// O(1), pois vai diretamente na estampa escolhida pelo usuário, utilizando a busca product.designs['estampaEscolhida'].
// Quanto maior o número de designs, mais impactante é essa melhoria. 
// Respeita, sulista!! kkkkk
// Dá uma pensada aí se de fato melhorou, mas acho que sim. Obviamente essa mudança traz um pouco mais de complexidade na 
// hora de buscar, mas acho que de boa. Visualizei cenários futuros e não vi nenhum problema insolúvel.
// Abaixo tem exemplo dessa nova estrutura, e embaixo a estrutura anterior.
// Note que já estamos usando essa ideia na tabela de sizes/Designs lá

/* 
const product2: IProduct2 = {
  id: 'wdhwidhwoidhwjio',
  category: 'pijama inverno',
  model: 'suede feminino',
  designs: {
    'Bicho preguiça': {
      picPath: '../Uploads/products/bicho-preguiça',
      info: [{

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
    Nutella: {
      picPath: '../Uploads/products/nutella',
      info: [{

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
  },
};

const product1 = {
  id: 1,
  category: 'Baby doll',
  model: 'Suede',
  designs: {
    llama: {
      picPath: '../Uploads/products/llama',
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
  },
};

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