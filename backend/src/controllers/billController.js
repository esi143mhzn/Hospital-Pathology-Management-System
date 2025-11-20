import BillItemModel from "../models/billItemModel.js";
import BillModel from "../models/billModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
}

const generateBillNo = async () => {
    const count = (await BillModel.getCount()) + 1;
    return `${count.toString().padStart(4,"0")}`;
}

export const createBill = async (req, res, next) => {
    try {
        const created_by = req.user?.id;
        const bill_no = await generateBillNo();
        const { bill_items, ...billInfo } = req.body;

        const billData = {
            ...billInfo,
            bill_no,
            created_by,
        };
        const newBill = await BillModel.create(billData);

        const billId = newBill.id;
        for (const item of bill_items) {
            await BillItemModel.create({
                bill_id: billId,
                test_category_id: item.test_category_id,
                price: item.price
            })
        }
        handleResponse(res, 201, "Bill created successfully!", newBill);
    } catch (err) {
        next(err);
    }
};

export const getBills = async (req, res, next) => {
    try {
        const bills = await BillModel.getAll();
        const billItems = await BillItemModel.getAll();

        const billsWithItems = bills.map(bill => {
            const items = billItems.filter(item =>  item.bill_id === bill.id)
                .map(item => ({
                    category_name: item.category_name,
                    price: item.price
                }));
            return {
                ...bill,
                bill_items: items
            };    
        })
        handleResponse(res, 200, "Bills fetched successfully!", billsWithItems);
    } catch (err) {
        next(err);
    }
}

export const getBillById = async (req, res, next) => {
    try {
        const bills = await BillModel.getById(req.params.id);
        const billItems = await BillItemModel.getById(req.params.id);

        const billsWithItems = bills.map(bill => {
            const items = billItems.filter(item =>  item.bill_id === bill.id)
                .map(item => ({
                    id: item.id,
                    test_category_id: item.test_category_id,
                    category_name: item.category_name,
                    price: item.price
                }));
            return {
                ...bill,
                bill_items: items
            };    
        })
        handleResponse(res, 200, "Bills fetched successfully!", billsWithItems);
    } catch (err) {
        next(err);
    }
}

export const updateBill = async (req, res, next) => {
    try {
        const created_by = req.user?.id;
        const billId = req.params.id;
        const { bill_items = [], ...billInfo } = req.body;
        const billData = {
            ...billInfo,
            created_by,
        };
        const updatedBill = await BillModel.update(billId, billData);
        for (const item of bill_items) {
            if(item.id) {
                await BillItemModel.update(item.id, {
                    bill_id: billId,
                    test_category_id: item.test_category_id, 
                    price: item.price
                });
            } else {
                await BillItemModel.create({
                    bill_id: billId,
                    test_category_id: item.test_category_id,
                    price: item.price
                });
            }
        }

        handleResponse(res, 200, "Bills updated successfully!", updatedBill);
    } catch (err) {
        next(err)
    }
}

export const deleteBill =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const bill = await BillModel.delete(id);
        if(!bill) return handleResponse(res, 404, "Bill not found!");

        handleResponse(res, 200, "Bill deleted successfully!");
    } catch (err) {
        next(err);
    }
}

export const deleteBillItem =  async (req, res, next) => {
    try {
        const { id } = req.params;
        const billItems = await BillItemModel.delete(id);
        if(!billItems) return handleResponse(res, 404, "Bill Item not found!");

        handleResponse(res, 200, "Bill Item deleted successfully!");
    } catch (err) {
        next(err);
    }
}