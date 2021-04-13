const {
  createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getAllFormat
} = require('./ecommerceController');
const Product = require('../models/productModel');
const Format = require('../models/formatModel');

jest.mock('../models/productModel');
jest.mock('../models/formatModel');

describe('Given a createProduct', () => {
  describe('When is invoked', () => {
    test('Then res.json should be invoked', () => {
      const req = { body: {} };
      const res = { json: jest.fn() };

      createProduct(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe('Given a getAllProducts function', () => {
  describe('When is invoked', () => {
    test('Then res.json should be invoked', async () => {
      const req = {};
      const res = { json: jest.fn() };

      Product.find.mockImplementationOnce(() => ({ populate: jest.fn() }));

      await getAllProducts(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe('Given a getProductById function', () => {
  let req;
  let res;
  describe('When is invoked with an id', () => {
    beforeEach(() => {
      req = { params: { id: 11 } };
      res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
    });
    describe('And the method findById works', () => {
      test('Then res.json shoud be called', async () => {
        Product.findById.mockImplementationOnce(() => ({ populate: jest.fn() }));

        await getProductById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the method findById throws and error', () => {
      test('Then res.send should be called', async () => {
        Product.findById.mockImplementationOnce(() => { throw new Error(''); });

        await getProductById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateProductById function', () => {
  let req;
  let res;
  describe('When is invoked with an req.params.id and req.body', () => {
    beforeEach(() => {
      req = { params: { id: 11 }, body: {} };
      res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
    });
    describe('And the method findByIdAndUpdate works', () => {
      test('Then res.json shoud be called', async () => {
        Product.findByIdAndUpdate.mockImplementationOnce(() => ({ populate: jest.fn() }));

        await updateProductById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the method findByIdAndUpdate throws and error', () => {
      test('Then res.send should be called', async () => {
        Product.findByIdAndUpdate.mockImplementationOnce(() => { throw new Error(''); });

        await updateProductById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteProductById function', () => {
  let req;
  let res;
  describe('When is invoked with an req.params.id and req.body', () => {
    beforeEach(() => {
      req = { params: { id: 12 } };
      res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
    });
    describe('And the method findByIdAndDelete works', () => {
      test('Then res.json shoud be called', async () => {
        Product.findByIdAndDelete.mockImplementationOnce(() => ({ populate: jest.fn() }));

        await deleteProductById(req, res);

        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the method findByIdAndUpdate throws and error', () => {
      test('Then res.send should be called', async () => {
        Product.findByIdAndDelete.mockImplementationOnce(() => { throw new Error(''); });

        await deleteProductById(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getAllFormat function', () => {
  describe('When is invoked', () => {
    test('Then res.json should be invoked', async () => {
      const req = {};
      const res = { json: jest.fn() };

      Format.find.mockImplementationOnce();

      await getAllFormat(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
