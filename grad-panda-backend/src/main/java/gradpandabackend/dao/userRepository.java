package gradpandabackend.dao;

import gradpandabackend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface userRepository extends MongoRepository<User, Long> {
}
