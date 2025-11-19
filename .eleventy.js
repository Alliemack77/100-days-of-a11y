export default function (eleventyConfig) {

  // add contents from src css files into public folder
  eleventyConfig.addPassthroughCopy("/src/assets/styles/tailwind.css");

  // watch for any changes to the css and update browser
  eleventyConfig.addWatchTarget("/src/assets/styles/tailwind.css")

  // remove "all" and "post" from every post's taglist
  eleventyConfig.addFilter("filteredTagList", function(tags) {
    return (
      (tags || []).filter(tag => ["all", "post"].indexOf(tag) === -1)
    )
    
  } )

  // add all tags from every post for pagination
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tags = new Set()
    const tagList = collectionApi.getAll()

    tagList.forEach(item => {
      let itemTags = item.data.tags
      if(!itemTags) return
      if(!Array.isArray(itemTags)) itemTags = [itemTags]
      itemTags.forEach(tag => {
        if (typeof tag !== "string") return
        const cleaned = tag.trim()
        if(!cleaned) return
        if(cleaned === "all" || cleaned === "post") return
        tags.add(cleaned)
      })
    })

    const result = Array.from(tags).sort()
    return result
  })


  return {
    dir: { 
        input: 'src', 
        output: 'public' 
    },
  };
}
