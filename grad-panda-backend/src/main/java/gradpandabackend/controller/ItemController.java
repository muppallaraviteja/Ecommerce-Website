package gradpandabackend.controller;

import Grad_Panda.dao.ItemRepository;
import Grad_Panda.models.Item;
import Grad_Panda.mongoTemplate.ItemDALImpl;
import Grad_Panda.service.SequenceGeneratorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*  /items   /all,/delete/{itemId},/create/ --post    */
@RestController
@RequestMapping(value = "/items")
public class ItemController {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final ItemRepository itemRepository;
    private final ItemDALImpl re;
    private SequenceGeneratorService sequenceGenerator;
    public ItemController(ItemRepository itemRepository, SequenceGeneratorService sequenceGenerator, ItemDALImpl re){
        this.itemRepository = itemRepository;
        this.sequenceGenerator = sequenceGenerator;
        this.re = re;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Item> getAllItems() {
        log.info("Getting all items.");
        return itemRepository.findAll();
    }

    @RequestMapping(value = "/{itemId}", method = RequestMethod.GET)
    public Object getUser(@PathVariable long itemId) {
        Item item = re.getItemById(itemId);
        log.info("Getting items by itemId");
        if (item != null) {
            return item;
        } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }


    @RequestMapping(value = "/delete/{itemId}")
    public ResponseEntity<?> delete_item(@PathVariable long itemId) {
        log.info("Deleting Item : {}", itemId);
        if(re.getItemById(itemId)!=null) {
           re.delete(itemId);
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/create/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create_User(@RequestBody Item item) {
        log.info("Creating Item : {}", item);
        item.setItemId(sequenceGenerator.generateSequence(Item.SEQUENCE_NAME));
        itemRepository.save(item);
        return new ResponseEntity<String>(HttpStatus.CREATED);
    }
}
