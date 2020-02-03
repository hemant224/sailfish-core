/******************************************************************************
 * Copyright 2009-2018 Exactpro (Exactpro Systems Limited)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.exactpro.sf.services.fix;

import java.util.List;

import com.exactpro.sf.common.services.ServiceName;
import com.exactpro.sf.configuration.ILoggingConfigurator;
import com.exactpro.sf.services.IServiceContext;
import com.exactpro.sf.services.ISession;

import quickfix.Application;

public interface IQuickfixApplication extends Application {

    void init(IServiceContext serviceContext, ApplicationContext applicationContext, ServiceName serviceName);
    List<ISession> getSessions();

    /**
     * Use {@link ILoggingConfigurator#registerLogger(Object, ServiceName)} to register application`s logger
     */
    void startLogging();

    /**
     * Deprecated, because service controls logger`s configuration.
     */
    @Deprecated
    default void stopLogging(){};
    default void onConnectionProblem(String reason) {}
}
