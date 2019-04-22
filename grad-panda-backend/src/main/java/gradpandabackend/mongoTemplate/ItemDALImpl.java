package gradpandabackend.mongoTemplate;

import gradpandabackend.dao.ItemDAL;
import gradpandabackend.models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemDALImpl implements ItemDAL {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Object delete(long itemId){
        Query query = new Query();
        query.addCriteria(Criteria.where("itemId").is(itemId));
        Item item = mongoTemplate.findOne(query, Item.class);
        if (item != null) {
            mongoTemplate.remove(item);
            return item;
        } else {
            return "Item not found.";
        }
    }

    @Override
    public List<Item> getAllItems() {
        return mongoTemplate.findAll(Item.class);
    }

    @Override
    public Item getItemById(long itemId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("itemId").is(itemId));
        return mongoTemplate.findOne(query, Item.class);
    }

    @Override
    public Item addNewItems(Item item) {
        mongoTemplate.save(item);
        return item;
    }

    @Override
    public Item changeItems(Item itemId, String key, Object value) {
        Query query = new Query();
        query.addCriteria(Criteria.where("itemId").is(itemId));
        Update update = new Update();
        update.set(key, value);
        mongoTemplate.updateFirst(query, update, Item.class);
        return mongoTemplate.findOne(query,Item.class);

    }

    @Override
    public boolean isItemExists(Item item) {
        Query query = new Query();
        query.addCriteria(Criteria.where("itemId").is(item.getItemId()));
        return (mongoTemplate.findOne(query, Item.class)!=null);

    }
}
