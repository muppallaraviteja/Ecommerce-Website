package gradpandabackend.controller;

import Grad_Panda.dao.OrderRepository;
import Grad_Panda.models.Order;
import Grad_Panda.mongoTemplate.OrderDALImpl;
import Grad_Panda.service.SequenceGeneratorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
/*/orders /all,/{orderId},/all/{customerId},/delete/{orderId},/create/ --post*/
@RequestMapping(value = "/orders")
public class OrderController {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final OrderDALImpl re;
    private final OrderRepository orderRepository;
    private SequenceGeneratorService sequenceGenerator;


    public OrderController(OrderRepository orderRepository, OrderDALImpl re, SequenceGeneratorService sequenceGenerator) {
        this.orderRepository = orderRepository;
        this.re = re;
        this.sequenceGenerator =sequenceGenerator;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Order> getAllUsers() {
        log.info("Getting all orders.");
        return orderRepository.findAll();
    }

    @RequestMapping(value = "/{orderId}", method = RequestMethod.GET)
    public Object getUser(@PathVariable long orderId) {
        Order order = re.getbyOrderId(orderId);
        if (order != null) {
            return order;
        } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/all/{customerId}", method = RequestMethod.GET)
    public Object getCustomerOrders(@PathVariable String customerId) {
        List<Order> orders = re.getOrdersByCustomerId(customerId);
        if (orders.size() >0) {
            return orders;
        } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/delete/{orderId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> delete_User(@PathVariable long orderId) {
        log.info("Deleting Order : {}", orderId);
        if(re.getbyOrderId(orderId)!=null) {
            re.delete(orderId);
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);

    }


    @RequestMapping(value = "/create/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create_User(@RequestBody Order order) {
        log.info("Creating Order : {}", order);
        order.setOrderId(sequenceGenerator.generateSequence(Order.SEQUENCE_NAME));
        orderRepository.save(order);
        return new ResponseEntity<String>(HttpStatus.CREATED);
    }

}
