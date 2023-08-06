import Post from './Post'

const DisplayPosts = ({ posts, deletePost, setFetcher }: DisplayPostProps) => {
  return (
    <div className="flex flex-col w-full overflow-auto">
      <div className="grid w-full h-full gap-10 auto-rows-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {posts !== null && posts.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full col-span-full">
            <span className="text-2xl font-bold">No posts found</span>
          </div>
        )}

        {posts.map((post, idx) => (
          <Post key={idx} post={post} deletePost={deletePost} setFetcher={setFetcher} />
        ))}
      </div>
    </div>
  )
}

export default DisplayPosts
