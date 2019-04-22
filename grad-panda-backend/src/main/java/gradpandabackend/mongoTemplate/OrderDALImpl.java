package gradpandabackend.mongoTemplate;

import gradpandabackend.dao.OrderDAL;
import gradpandabackend.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/*

    @Override
    public List<Order> getAllOrders() {
        return null;
    }

    @Override
    public Order getOrderById(long orderId) {
        return null;
    }

    @Override
    public Order addNewOrder(Order order) {
        return null;
    }

    @Override
    public boolean isOrderExists(Order order) {
        return false;
    }
*/


@Repository
public class OrderDALImpl implements OrderDAL {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Order> getAllOrders() {
        return mongoTemplate.findAll(Order.class);
    }

    @Override
    public Order getbyOrderId(long orderId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("orderId").is(orderId));
        return mongoTemplate.findOne(query,Order.class);
    }

    @Override
    public List<Order> getOrdersByCustomerId(String customerId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("customerId").is(customerId));
        return mongoTemplate.find(query,Order.class);
    }

    @Override
    public boolean isOrderExists(Order order) {
        Query query = new Query();
        query.addCriteria(Criteria.where("orderId").is(order.getOrderId()));
        return (mongoTemplate.findOne(query, Order.class)!=null);
    }


    @Override
    public Order addNewOrder(Order order) {
        mongoTemplate.save(order);
        // Now, User object will contain the ID as well
        return order;
    }

    public Object delete(long orderId){
        Query query = new Query();
        query.addCriteria(Criteria.where("orderId").is(orderId));
        Order order = mongoTemplate.findOne(query, Order.class);
        if (order != null) {
            mongoTemplate.remove(order);
            return order;
        } else {
            return "Order not found.";
        }

    }

 }
