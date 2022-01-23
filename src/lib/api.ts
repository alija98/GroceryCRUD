export interface SingleItemType {
  id: number;
  name: string;
  quantity: number;
}

export const getGrocery = async (): Promise<SingleItemType[]> =>
  fetch('/api/groceries').then(res => res.json());

export const createGrocery = async (text: string): Promise<SingleItemType> =>
  fetch('/api/groceries', {
    method: 'POST',
    body: JSON.stringify(text),
  }).then(res => res.json());

export const updateGrocery = async (data: {id: number; operation: string}) => {
  let id = Object.values(data)[0];

  fetch(`/api/groceries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }).then(res => res.json());
};

export const deleteGrocery = async (id: number) => {
  fetch(`/api/groceries/${id}`, {
    method: 'DELETE',
  }).then(res => res.json());
};
