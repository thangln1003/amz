using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Amz.Core.Entities;
using Amz.SharedKernel.Interfaces;
using MediatR;

namespace Amz.Core.Handlers.ToDoItems.Commands
{
    public class NewToDoItemRequest : IRequest<ToDoItemDto>
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class CreateToDoItemHandler : IRequestHandler<NewToDoItemRequest, ToDoItemDto>
    {
        private readonly IRepository _repository;

        public CreateToDoItemHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItemDto> Handle(NewToDoItemRequest request, CancellationToken cancellationToken)
        {
            var item = new ToDoItem
            {
                Title = request.Title,
                Description = request.Description
            };

            var createdItem = await _repository.AddAsync(item);

            return ToDoItemDto.FromToDoItem(createdItem);
        }
    }
}
