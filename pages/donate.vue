<template>
  <div class="donation-page">
    <UContainer class="donation-container">
      <div
        class="content-wrapper flex flex-col md:flex-row justify-between items-start w-full"
      >
        <div class="donation-description md:w-1/2 md:pr-8">
          <h2
            class="text-3xl font-bold text-center md:text-left mb-4 text-gray-900 dark:text-gray-100"
          >
            Support Peak of Eloquence ✨
          </h2>
          <hr class="my-8 border-gray-300 dark:border-gray-600" />
          <p
            class="text-lg text-center md:text-left mb-4 text-gray-800 dark:text-gray-300 leading-relaxed"
          >
            🙏 Your donations help <strong>maintain and enhance this website</strong>. As
            a solo developer, I invest a lot of time and money to bring these updates and
            improve the experience for the community. Thank you for your support! 💖
          </p>
          <hr class="my-8 border-gray-300 dark:border-gray-600" />
          <p
            class="text-lg text-center md:text-left mb-4 text-gray-800 dark:text-gray-300 leading-relaxed"
          >
            Here are some features your donations will support:
          </p>
          <ul
            class="text-lg text-left mb-4 text-gray-800 dark:text-gray-300 leading-relaxed list-disc list-inside"
          >
            <li>🔒 <strong>Logins</strong></li>
            <li>🗣️ <strong>Voice reading</strong></li>
            <li>📝 <strong>Notes</strong></li>
            <li>📅 <strong>Event scheduling</strong></li>
            <li>📚 <strong>Educational resources</strong></li>
            <li>🔔 <strong>Notifications</strong></li>
          </ul>
          <hr class="my-8 border-gray-300 dark:border-gray-600" />
          <p
            class="text-lg text-center md:text-left mb-8 text-gray-800 dark:text-gray-300 leading-relaxed"
          >
            Every contribution, no matter the size, helps keep this site running and
            growing. Thank you! 🙌
          </p>
          <p
            class="text-lg text-center md:text-left mb-8 text-gray-800 dark:text-gray-300 leading-relaxed italic"
          >
            "I hope to continuatlly improve this website and make it a valuable resource
            for everyone. Your support means the world to me!" 🌍
          </p>
        </div>
        <div class="iframe-container md:w-1/2">
          <iframe
            id="kofiframe"
            src="https://ko-fi.com/peakofeloquence/?hidefeed=true&widget=true&embed=true&preview=true"
            class="donation-iframe"
            title="peakofeloquence"
          ></iframe>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script>
export default {
  name: "DonationPage",
};
</script>

<style scoped>
.donation-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9fafb; /* Tailwind gray-50 */
  padding: 20px;
}

.donation-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px; /* Increased padding for better spacing */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.content-wrapper {
  width: 100%;
}

.donation-iframe {
  width: 100%;
  height: 60vh;
  border: none;
  overflow: hidden;
  border-radius: 8px;
}

body {
  background-color: #f9fafb; /* Tailwind gray-50 */
}

@media (prefers-color-scheme: dark) {
  .donation-page {
    background-color: #1f2937; /* Tailwind gray-800 */
  }
  .donation-container {
    background-color: #111827; /* Tailwind gray-700 */
    color: #d1d5db; /* Tailwind gray-300 */
  }
  .donation-description h2 {
    color: #f3f4f6; /* Tailwind gray-100 */
  }
  .donation-description p,
  .donation-description ul {
    color: #d1d5db; /* Tailwind gray-300 */
  }
}
</style>
