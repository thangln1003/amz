﻿using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Amz.Core.Entities;
using Amz.Web;
using Newtonsoft.Json;
using Xunit;

namespace Amz.FunctionalTests.Api
{
    public class ApiToDoItemsControllerList : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ApiToDoItemsControllerList(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task ReturnsTwoItems()
        {
            var response = await _client.GetAsync("/api/todoitems");
            response.EnsureSuccessStatusCode();
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ToDoItem>>(stringResponse).ToList();

            Assert.Equal(3, result.Count());
            Assert.Contains(result, i => i.Title == SeedData.ToDoItem1.Title);
            Assert.Contains(result, i => i.Title == SeedData.ToDoItem2.Title);
            Assert.Contains(result, i => i.Title == SeedData.ToDoItem3.Title);
        }
    }
}
