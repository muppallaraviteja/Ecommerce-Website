package gradpandabackend.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

//Order Status
@Document(collection = "orders")
public class Order {
    @Id
    private long orderId;
    @Transient
    public static final String SEQUENCE_NAME = "orders_sequence";
    private Date date = new Date();
    private float price;
    private String customerId;
    private OrderDetails [] orderDetails;

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public OrderDetails[] getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(OrderDetails[] orderDetails) {
        this.orderDetails = orderDetails;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

}
