<template>
  <button @click="deleteProfile">Delete Profile</button>
</template>
<script>
export default {
  name: "DeleteProfileButton",
  methods: {
    deleteProfile() {
      const confirmation = confirm(
        "Are you sure you want to delete your profile?"
      );
      if (confirmation) {
        alert("Profile Deleted");
      }
    },
  },
};
</script>
