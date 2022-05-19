export class Model {
    id: number = 0;
    storeId: number = 0;
    categoryId: number = 0;
    name: string = '';
    description: string = '';
    showPrice: boolean = false;
    price: number = 0;
    favNote: string = '';
    createdOn!: Date;
    createdBy: string = '';
    active: boolean =false;
    imagePath: string = '';
}
