initSidebarItems({"mod":[["conv","Method-Directed Type ConversionThe `std::convert` module provides traits for converting values from one type to another. The first of these, `From<T>`, provides an associated function `from(orig: T) -> Self`. This function can only be called in prefix-position, as it does not have a `self` receiver. The second, `Into<T>`, provides a method `into(self) -> T` which can be called in suffix-position; due to intractable problems in the type solver, this method cannot have any further method calls attached to it. It must be bound directly into a `let` or function call."],["pipe","Universal Suffix CallsThis module provides a single trait, `Pipe`, which provides a number of methods useful for placing functions in suffix position. The most common method, `pipe`, forwards a value `T` into any function `T -> R`, returning `R`. The other methods all apply some form of borrowing to the value before passing the borrow into the piped function. These are of less value, but provided to maintain a similar API to the `tap` module’s methods, and for convenience in the event that you do have a use for them."],["prelude","Reëxports all traits in one place, for easy import."],["tap","Point-Free InspectionThe standard library does not provide a way to view or modify an expression without binding it to a name. This module provides extension methods that take and return a value, allowing it to be temporarily bound without creating a new `let`-statement in the enclosing scope."]]});