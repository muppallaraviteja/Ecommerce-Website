package gradpandabackend.events;

import gradpandabackend.models.Item;
import gradpandabackend.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class ItemModelListener extends AbstractMongoEventListener<Item> {

    private SequenceGeneratorService sequenceGenerator;

    @Autowired
    public ItemModelListener(SequenceGeneratorService sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Item> event) {
        if (event.getSource().getItemId() < 1) {
            event.getSource().setItemId(sequenceGenerator.generateSequence(Item.SEQUENCE_NAME));
        }
    }


}
