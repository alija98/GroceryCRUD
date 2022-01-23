import {parse} from '@babel/core';
import {createServer, Model} from 'miragejs';
let groceries = [
  {id: 0, name: 'Apples', quantity: 10},
  {
    id: 1,
    name: 'Milk',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Orange Juice',
    quantity: 2,
  },
];

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/groceries', () => groceries);

    this.post('/groceries', (schema, request) => {
      let name = JSON.parse(request.requestBody);
      let item = {
        id: groceries.length,
        name: name,
        quantity: 1,
      };
      groceries.push(item);
      return {groceries};
    });

    this.patch('/groceries/:id', (schema, request) => {
      const operation = Object.values(JSON.parse(request.requestBody))[1];
      let id = request.params.id;
      groceries = groceries.map(item => {
        if (item.id === Number(id)) {
          item.quantity =
            operation === 'plus' ? item.quantity + 1 : item.quantity - 1;
          return item;
        }
        return item;
      });

      return {groceries};
    });

    this.del('/groceries/:id', (schema, request) => {
      let id = request.params.id;
      groceries = groceries.filter(item => item.id !== Number(id));
      return {groceries};
    });
  },
});
