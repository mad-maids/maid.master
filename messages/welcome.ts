export default (): void => {
    console.log(`
Welcome to the Stacktion Project Management CLI!

    Usage:
        stacktion [command]

    Commands:
        --run: Run the project
        --compile: Compiles the project
        --format: Format the code
        --lint: Lint the code
        --test: Run the tests
`);
  Deno.exit(1);
}