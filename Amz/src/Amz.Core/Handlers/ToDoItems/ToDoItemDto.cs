using System.ComponentModel.DataAnnotations;
using Amz.Core.Entities;

namespace Amz.Core.Handlers.ToDoItems
{
    public class ToDoItemDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }

        public static ToDoItemDto FromToDoItem(ToDoItem item)
        {
            return new ToDoItemDto
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                IsDone = item.IsDone
            };
        }
    }
}
