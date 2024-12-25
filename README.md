# TequipyOffboarding

### Features

- Table sorting
- Offboarding employees
- Columns selection
- Filters memoization (runtime memory)

### Design Assumptions:

- Mixing equipment and employee domains becomes a tech debt as soon as we add another domain using either of those, so for sake of simplicity I assumed we'll not have another domain.
- To simulate be<->fe communication, I used IndexedDB instead of api (it's as well async) to save your time and deploy live demo online.
- Since code will be reviewed hollistically, there's no need to split it into commits following SRP.
- We don't have GraphQL. With GQL we could be using different design for the FE codebase (simpler, less scalable), but it's CRUD and not content-heavy platform, so we can put a bit more responsibility of data management to the client side.
- We don't have EventStore. I can imagine we could wish to log all transactions around the offboarding process, undo/redo easily, but described API doesn't indicate such pattern.
- Because of bounded-context, we don't need to prefix enums (e.g. EmployeeStatus instead of Status), resulting in Employee entity having field with EmployeeStatus type.
- It's possible one equipment is assigned to multiple employees, but for this example we are going to keep it simple.

### To reset DB

`DevTools -> Application -> IndexedDB -> com.tequipy -> Delete Database`

### Running locally

`pnpm i && pnpm start`
