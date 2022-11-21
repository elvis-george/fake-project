import axios from "axios";
import { API_BASE_URL} from "../constants";

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
    }

    async request({endpoint, method=`GET`, data={}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json"
        }

        try {
            const res = await axios({url, method, data, headers});
            return {data: res.data, error: null};
        } catch (error) {
            console.error({ errorResponse: error.response});
            const message = error?.response?.data?.error?.message;
            const status = error?.response?.data?.error?.status;
            return {data: null, error: message || String(error), errorStatus: status || 0};
        }
    }
    
    /**
     * API client to fetch all Inventory Items
     * @returns all Inventory items
     */
    async fetchInventory() {
        return await this.request({ endpoint: "inventory", method: `GET`});
    }

    /**
     * API client to create a new Inventory Item
     * @param {*} item json object that contains information about the inventory item that needs to be created
     * @returns newly added Inventory item
     */
    async createInventoryItem(item) {
        return await this.request({ endpoint: "inventory", method: `POST`, data: {item}});
    }

    /**
     * API client to edit existing Inventory items
     * @param {*} updatedItem json object that contains the updated information of the inventory item
     * @param {*} itemID json object that contains the ID of the inventory item that needs to be updated
     * @returns Currently updated Inventory Item
     */
    async editInventoryItem(updatedItem, itemID){
        return await this.request({ endpoint: `inventory/${itemID}`, method: `PUT`, data:{updatedItem}});
    }
    
    /**
     * API client to delete an inventory item
     * @param {*} itemID json object that contains the ID of the inventory item that needs to be deleted
     * @returns Deleted inventory item
     */
    async deleteInventoryItem(itemID){
        return await this.request({ endpoint:`inventory/${itemID}`, method: `DELETE`});
    }

    /**
     * API client to fetch all orders
     * @returns a table with all the orders
     */
    async fetchOrders() {
        return await this.request({endpoint: "orders", method: `GET`});
    }

    /**
     * API cliet to fetch all the menu items
     * @returns a table with all the menu items
     */
    async fetchMenuItems() {
        return await this.request({endpoint: "menu", method: `GET`});
    }
    
    /**
     * API client to fetch a specific menu item based on ID 
     * @param {*} itemID ID of the menu item that the user is looking for
     * @returns menu item whose ID matched itemID
     */
    async getMenuItemByID(itemID) {
        return await this.request({endpoint: `menu/${itemID}`, method: `GET`});
    }

    /**
     * API cliet to create a new menu item
     * @param {*} itemType specifies the type of the item that is being added to the menu
     * @param {*} item contains all detais about the menu item that needs to be created
     * @returns the newly created menu item
     */
    async createMenuItem(itemType, item) {
        return await this.request({endpoint: `menu/${itemType}`, method: `POST`, data:{item}});
    }
    
    /**
     * API client to edit exisiting menu items
     * @param {*} itemType specifies the type of the item that need to be edited
     * @param {*} item contains all the updated detais about the menu item that needs to be edited
     * @returns the updated menu item
     */
    async editMenuItem(itemType, item) {
        return await this.request({endpoint: `menu/${itemType}`, method: `PUT`, data: {item}});
    }

    /**
     * API client to delete a menu item
     * @param {*} itemID specifies the ID of the item that needs to be deleted
     * @returns deleted menu item information
     */
    async deleteMenuItem(itemID) {
        return await this.request({endpoint: `menu/${itemID}`, method: `DELETE`});
    }

    /**
     * API client to fetch sales report
     * @param {*} fromDate beginning date for sales report generation
     * @param {*} toDate end date for sales report generation
     * @returns all the sales made in the given time frame organised by menu items
     */
    async fetchSalesReport(fromDate, toDate) {
        return await this.request({endpoint: `orders/sales?fromDate=${fromDate}&toDate=${toDate}`, method: `GET`});
    }
    
    /**
     * API client to add order to the Orders table
     * @param {*} orderPlaced contains information about the new order that needs to be added to the database
     * @returns newly added order
     */
    async addOrder(orderPlaced) {
        return await this.request({endpoint: `orders`, method:`POST`, data: {orderPlaced}});
    }

    // returns most popular pairs
    /**
     * API client to generate a report that highlights the most popular pairs of items
     * @param {*} fromDate beginning date for report generation
     * @param {*} toDate end date for report generation
     * @returns all the most popular pairs of items among the customers in the given timeframe
     */
    async popularPairs(fromDate, toDate) {
        return await this.request({endpoint: `orders/pairs`, method: `GET`, data: {fromDate, toDate}});
    }
}

export default new ApiClient(API_BASE_URL);