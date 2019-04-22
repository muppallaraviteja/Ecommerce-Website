package gradpandabackend.mongoTemplate;

import gradpandabackend.dao.userDAL;
import gradpandabackend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class userDALImpl implements userDAL {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<User> getAllUsers() {
        return mongoTemplate.findAll(User.class);
    }

    @Override
    public User getUserById(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public boolean isUserExist(User user) {
        Query query = new Query();
        query.addCriteria(Criteria.where("emailId").is(user.getEmailId()));
        return (mongoTemplate.findOne(query, User.class)!=null);
    }


    @Override
    public User addNewUser(User user) {
        mongoTemplate.save(user);
        // Now, User object will contain the ID as well
        return user;
    }

    @Override
    public Object getAllUserSettings(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        User user = mongoTemplate.findOne(query, User.class);
        return user != null ? user.getUserSettings() : "User not found.";
    }

    @Override
    public String getUserSetting(String userId, String key) {
        Query query = new Query();
        query.fields().include("userSettings");
        query.addCriteria(Criteria.where("userId").is(userId).andOperator(Criteria.where("userSettings." + key).exists(true)));
        User user = mongoTemplate.findOne(query, User.class);
        return user != null ? user.getUserSettings().get(key) : "Not found.";
    }

    @Override
    public String addUserSetting(String userId, String key, String value) {
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        User user = mongoTemplate.findOne(query, User.class);
        if (user != null) {
            user.getUserSettings().put(key, value);
            mongoTemplate.save(user);
            return "Key added.";
        } else {
            return "User not found.";
        }
    }


    public Object delete(String userId){
        Query query = new Query();
        query.addCriteria(Criteria.where("userId").is(userId));
        User user = mongoTemplate.findOne(query, User.class);
        if (user != null) {
           mongoTemplate.remove(user);
            return user;
        } else {
            return "User not found.";
        }

    }
}
