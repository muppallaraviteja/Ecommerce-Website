package gradpandabackend.events;

import gradpandabackend.models.Order;
import gradpandabackend.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;


@Component
public class OrderModelListener extends AbstractMongoEventListener<Order> {

    private SequenceGeneratorService sequenceGenerator;

    @Autowired
    public OrderModelListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Order> event) {
        if (event.getSource().getOrderId() < 1) {
            event.getSource().setOrderId(sequenceGenerator.generateSequence(Order.SEQUENCE_NAME));
        }
    }


}
