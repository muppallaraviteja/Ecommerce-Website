package gradpandabackend.dao;

import gradpandabackend.models.Item;

import java.util.List;

public interface ItemDAL  {

    List<Item> getAllItems();
    Item getItemById(long itemId);
    Item addNewItems(Item item);
    Item changeItems(Item itemId, String Key, Object Value);
    boolean isItemExists(Item item);
}
