<template>
  <div class="m-4">
    <h1>Todos</h1>
    <form @submit.prevent="addTodo">
      <UInput v-model="newTodo" placeholder="Add a new todo" />
      <UButton type="submit">Add</UButton>
    </form>
    <ul class="mt-4">
      <li v-for="todo in todos" :key="todo.id" class="flex flex-row gap-2">
        <UCheckbox v-model="todo.completed" @change="toggleTodo(todo)" />
        <div :class="{ 'line-through': todo.completed }" class="h-10 w-50">
          {{ todo.text }}
        </div>
        <div>
          <UButton size="sm" @click="deleteTodo(todo.id)">Delete</UButton>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { data: todos, refresh } = await useFetch("/api/todos");
const newTodo = ref("");

async function addTodo() {
  if (!newTodo.value.trim()) return;
  await $fetch("/api/todos", {
    method: "POST",
    body: { text: newTodo.value },
  });
  newTodo.value = "";
  refresh();
}

async function toggleTodo(todo) {
  await $fetch("/api/todos", {
    method: "PUT",
    body: { id: todo.id, completed: todo.completed },
  });
  refresh();
}

async function deleteTodo(id: string) {
  await $fetch(`/api/todos/${id}`);
  refresh();
}
</script>
