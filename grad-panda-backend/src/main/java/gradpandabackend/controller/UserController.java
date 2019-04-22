package gradpandabackend.controller;

import Grad_Panda.dao.userRepository;
import Grad_Panda.models.User;
import Grad_Panda.mongoTemplate.userDALImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
/*/users /all,/{userId},/settings/{userId},/settings/{userId}/{key},/settings/{userId}/{key}/{value} --Put,/create/,/delete/{userId}*/
@RequestMapping(value = "/users")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final userDALImpl re;
    private final userRepository userRepository;

    public UserController(userRepository userRepository, userDALImpl re) {
        this.userRepository = userRepository;
        this.re = re;
    }
    /*---------------------------------------------------------Get Methods-----------------------------------------------------*/
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<User> getAllUsers() {
        log.info("Getting all users.");
        return userRepository.findAll();
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    public Object getUser(@PathVariable String userId) {
        User user = re.getUserById(userId);
        if (user != null) {
            return user;
        } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/settings/{userId}", method = RequestMethod.GET)
    public Object getAllUserSettings(@PathVariable String userId) {
       // User User = userRepository.findOne(userId);
        User user = re.getUserById(userId);
        if (user != null) {
            return user.getUserSettings();
        } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/settings/{userId}/{key}", method = RequestMethod.GET)
    public Object getUserSetting(@PathVariable String userId, @PathVariable String key) {
                //User User = userRepository.findOne(userId);
        User user = re.getUserById(userId);
        if (user != null) {
        return user.getUserSettings().get(key);
    } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
         }
    }

    @RequestMapping(value = "/settings/{userId}/{key}/{value}", method = RequestMethod.PUT)
    public ResponseEntity<?> addUserSetting(@PathVariable String userId, @PathVariable String key, @PathVariable String value) {
        User user = re.getUserById(userId);
        if (user != null) {
            user.getUserSettings().put(key, value);
            userRepository.save(user);
            return new ResponseEntity<String>(HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/create/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<?> create_User(@RequestBody User user) {
            log.info("Creating User : {}", user);
            if(!re.isUserExist(user)) {
                userRepository.save(user);
                return new ResponseEntity<String>(HttpStatus.CREATED);
            }
            else
                return new ResponseEntity<String>(HttpStatus.CONFLICT);
    }

    @RequestMapping(value = "/delete/{userId}")
    public ResponseEntity<?> delete_User(@PathVariable String userId) {
        log.info("Deleting User : {}", userId);
        if(re.getUserById(userId)!=null) {
            re.delete(userId);
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        else
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);

    }
}


