export default function (eleventyConfig) {

  // add contents from src css files into public folder
  eleventyConfig.addPassthroughCopy("/src/assets/styles/tailwind.css");

  // watch for any changes to the css and update browser
  eleventyConfig.addWatchTarget("/src/assets/styles/tailwind.css")

  eleventyConfig.addFilter("filteredTagList", function(tags) {
    return (
      (tags || []).filter(tag => ["all", "post"].indexOf(tag) === -1)
    )
    
  } )

  return {
    dir: { 
        input: 'src', 
        output: 'public' 
    },
  };
}
