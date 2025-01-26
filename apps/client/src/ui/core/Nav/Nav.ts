function nav(strings: TemplateStringsArray, personExp = 0, ageExp = 0) {
  console.log("strings", strings);

  const str0 = strings[0]; // "That "
  const str1 = strings[1]; // " is a "
  const str2 = strings[2]; // "."

  const ageStr = ageExp < 100 ? "youngster" : "centenarian";

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

const Nav = () => {
  const output = nav`
    <template id="itemTemplate">
      <div class="item">
        <h2></h2>
        <p></p>
      </div>
    </template>
  `;

  return `
    <nav
      id="main-nav"
      class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 shadow sm:items-baseline w-full"
    >
      <div class="mb-2 sm:mb-0">
        <a
          href="/"
          class="text-2xl no-underline text-white hover:text-blue-dark"
          onclick="route()"
          >Home</a
        >
      </div>
      <div>
        <a
          href="/about"
          class="text-lg no-underline text-white hover:text-blue-dark ml-2"
          onclick="route()"
          >About</a
        >
      </div>
    </nav>
`;
};

export default Nav;
