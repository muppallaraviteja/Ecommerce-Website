package gradpandabackend.dao;

import gradpandabackend.models.Order;

import java.util.List;

public interface OrderDAL {

    List<Order> getAllOrders();
    public Order getbyOrderId(long orderId);
    List<Order> getOrdersByCustomerId(String customerId);
    Order addNewOrder(Order order);
    boolean isOrderExists(Order order);
}
