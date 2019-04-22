package gradpandabackend.dao;

import gradpandabackend.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface pandaRepository extends MongoRepository<Order,String > {
}
