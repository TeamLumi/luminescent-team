# Headers

## WIP - These docs are a Work In Progress and are currently mostly for my own use

## Introduction

Headers allow us to define a few things; They allow us to use cleaner manually created types than those provided in `il2cpp.h` and they allow us to reference methods in the main program.

## il2cpp.h

The `il2cpp.h` header includes all the types defined in the main program but they are not very pretty, they're all in the global namespace and have poor names. You can use these types but often times your code will be much better and more readable when you write a new header file.

## Complete Example

See here an example header file I've written for the UnityAction Class. It include function definitions, a super class, nested namespaces, forward declarations, external pointer.  
Note: This does not include the linked symbols, those will also need to be defined in the `symbols.ld` file if you want to access a static value or a method.

`include/UnityEngine/Events/UnityAction.hpp`
```c++
#pragma once
#include "System/MulticastDelegate.hpp"

namespace System
{
	class IAsyncResult;
	class AsyncCallback;
}


namespace UnityEngine {
	namespace Events {
		extern void* UnityAction_TypeInfo;
		
		struct UnityAction_Fields {
			System::MulticastDelegate_Fields super;
		};
		
		struct UnityAction_StaticFields {
		};

		struct UnityAction_RGCTXs {
		};

		struct UnityAction_VTable {
			VirtualInvokeData _0_Equals;
			VirtualInvokeData _1_Finalize;
			VirtualInvokeData _2_GetHashCode;
			VirtualInvokeData _3_ToString;
			VirtualInvokeData _4_unknown;
			VirtualInvokeData _5_unknown;
			VirtualInvokeData _6_Clone;
			VirtualInvokeData _7_GetMethodImpl;
			VirtualInvokeData _8_GetObjectData;
			VirtualInvokeData _9_GetInvocationList;
			VirtualInvokeData _10_CombineImpl;
			VirtualInvokeData _11_RemoveImpl;
			VirtualInvokeData _12_Invoke;
			VirtualInvokeData _13_BeginInvoke;
			VirtualInvokeData _14_EndInvoke;
		};
		
		struct UnityAction_Klass {
			Il2CppClass_1 _1;
			UnityAction_StaticFields* static_fields;
			UnityAction_RGCTXs* rgctx_data;
			Il2CppClass_2 _2;
			UnityAction_VTable vtable;
		};
		
		struct UnityAction : System::MulticastDelegate {
			UnityAction_Klass *klass;
			void *monitor;
			UnityAction_Fields fields;

			void ctor(Il2CppObject *target, MethodInfo *method);
			void Invoke(MethodInfo *method);
			System::IAsyncResult* BeginInvoke(System::AsyncCallback *callback, Il2CppObject *object,MethodInfo *method);
			void EndInvoke(System::IAsyncResult *result, MethodInfo *method);
		};
	}
}
```