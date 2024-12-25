# TequipyOffboarding

### Design Assumptions:

- Employees are used solely in offboarding domain, other domains using them doesn't exist.
- Mixing equipment and employee domains becomes a tech debt as soon as we add another view using either of those, so for sake of simplicity I assumed we'll never have more than one view.
- To simulate be<->fe communication, I used IndexedDB instead of api (it's as well async) to save your time and deploy live demo online.
- We'll not have other domains, so it doesn't make sense to put things into shared domain (like generic types).
- Since it's interview, code will be reviewed hollistically, so there's no need to split it into commits following SRP.
- We don't have GraphQL. With GQL we could be using different design for the FE codebase (simpler, less scalable), but it's CRUD and not content-heavy platform, so we can put a bit more responsibility of data management to the client side.
- We don't have EventStore. I can imagine we could wish to log all transactions around the offboarding process, undo/redo easily, but described API doesn't indicate such pattern.
- Because of bounded-context, we don't need to prefix enums (e.g. EmployeeStatus instead of Status), resulting in Employee entity having field with EmployeeStatus type.
- EmployeesDB is storing equipment information for simplicity, but in a real-world I'd expect equipment and employee to be a separated db collections.
- It's possible one equipment is assigned to multiple employees, but for this example we are going to keep it simple.
