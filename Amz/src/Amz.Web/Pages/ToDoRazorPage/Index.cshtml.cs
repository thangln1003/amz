﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Amz.Core.Entities;
using Amz.SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Amz.Web.Pages.ToDoRazorPage
{
    public class IndexModel : PageModel
    {
        private readonly IRepository _repository;

        public List<ToDoItem> ToDoItems { get; set; }

        public IndexModel(IRepository repository)
        {
            _repository = repository;
        }

        public async Task OnGetAsync()
        {
            ToDoItems = await _repository.ListAsync<ToDoItem>();
        }
    }
}
