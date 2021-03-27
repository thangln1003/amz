using System.Threading;
using System.Threading.Tasks;
using Amz.Core.Entities;
using Amz.SharedKernel.Interfaces;
using MediatR;

namespace Amz.Core.Handlers.ToDoItems.Commands
{
    public class CompleteToDoItemRequest : IRequest<ToDoItemDto>
    {
        public int Id { get; set; }
    }

    public class CompleteToDoItemHandler : IRequestHandler<CompleteToDoItemRequest, ToDoItemDto>
    {
        private readonly IRepository _repository;

        public CompleteToDoItemHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItemDto> Handle(CompleteToDoItemRequest request, CancellationToken cancellationToken)
        {
            var toDoItem = await _repository.GetByIdAsync<ToDoItem>(request.Id);
            toDoItem.MarkComplete();

            await _repository.UpdateAsync(toDoItem);

            return ToDoItemDto.FromToDoItem(toDoItem);
        }
    }
}
