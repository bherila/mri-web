INSTRUCTIONS FOR BUILDING UCSHARED

1. Get the ucshared repo from Git
2. Download swagger-codegen-ucshared.txt and replace the path in the command with the path to your ucshared.
3. Install pfmap so you can mount the cfs image
4. Download the cfs image and double click it & mount as read-only volume
5. Run the command and it will update your ucshared
6. In the generated api.ts file you need to replace the first ~20 lines with the contents of api_header.ts included in the root dir
7. Run tsc -p . from the ucshared folder
8. Review changes in git status & commit.
9. Increment the version with npm version minor
10. Publish the package with npm publish
11. Install the new package with npm install inside www and admin folder (don't forget to use —save param)
12. Commit updated package.json and package-lock.json from www and admin folders after upgrading.
