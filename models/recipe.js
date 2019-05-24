// TODO: we will want two schemas here; we want the "main" recipe schema but also
// the embedded comment schema here; BOTH schemas will need a ref: "User" (i.e. a
// reference to a related data entity); this is because both a recipe and comment
// must know who created; however, a recipe and comment will not necessarily be
// created by the SAME user (in fact, they most likely won't)