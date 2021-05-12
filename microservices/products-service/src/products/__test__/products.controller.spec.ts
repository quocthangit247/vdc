import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(() => {
    const mockProductModel = {
      countDocuments: jest.fn().mockResolvedValue(0),
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest
            .fn()
            .mockReturnValue({ limit: jest.fn().mockReturnValue({ lean: jest.fn().mockReturnValue([]) }) }),
        }),
      }),
      findById: jest.fn().mockReturnValue({
        _id: '609b2e72d73dcf18c30038ca',
        lean: jest.fn().mockReturnValue({
          _id: '609b2e72d73dcf18c30038ca',
          name: 'name 1',
          brand: 'Schaden LLC',
          category: 'category',
          rating: 3,
          sku: 'sku 1',
          variants: [
            {
              listPrice: 700,
              salePrice: 800,
              imageLink: 'https://picsum.photos/200/300',
              color: 'red',
              quantity: 10,
            },
            {
              listPrice: 800,
              salePrice: 800,
              imageLink: 'https://picsum.photos/200/300',
              color: 'black',
              quantity: 6,
            },
          ],
          specifications: [
            {
              name: 'Băng tần 3G',
              value: 'HSPA 42.2/5.76 Mbps, EV-DO Rev.A 3.1 Mbps',
            },
          ],
          description: 'description',
        }),
      }),
    } as any;
    productsService = new ProductsService(mockProductModel);
    productsController = new ProductsController(productsService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const res = await productsController.findAll({ limit: 10, skip: 10, search: {} as any, sort: {} as any });

      expect(res.data.data).toStrictEqual([]);
      expect(res.data.total).toBe(0);
    });
  });

  describe('getProductDetails', () => {
    it('should return product details', async () => {
      const res = await productsController.getProductDetails('609b2e72d73dcf18c30038ca');

      expect(res.data.id).toBe('609b2e72d73dcf18c30038ca');
    });
  });
});
